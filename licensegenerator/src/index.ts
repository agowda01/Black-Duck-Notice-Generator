import * as core from '@actions/core';
import { BlackDuckNotice } from './services/BlackDuckNotice';

async function run(): Promise<void> {
    try {
        // Input Retrieval with Environment Variable Fallback
        const bdUrl = core.getInput('blackduck-url', { required: true });
        const bdTokenInput = core.getInput('blackduck-token', { required: false });
        const bdTokenEnv = process.env.BLACKDUCK_TOKEN;
        const bdProjectName = core.getInput('project-name', { required: true });
        const bdVersionName = core.getInput('version-name', { required: true });
        const noticeFilePath = core.getInput('notice-file-path', { required: false }) || 'oss-notice-file.txt';
        const localNoticeFileDirectory = core.getInput('local-notice-file-directory', { required: false }) || 'false';
        const generateNoticeFile = core.getBooleanInput('generate-notice-file', { required: false });
        const getLatestNoticeFile = core.getBooleanInput('get-latest-notice-file', { required: false });
        const modifyNoticeFile = core.getBooleanInput('modify-notice-file', { required: false });

        // Authentication Resolution: Input → Environment Variable
        const bdToken = bdTokenInput || bdTokenEnv;

        if (!bdToken) {
            core.setFailed('Authentication required: Provide blackduck-token input or set BLACKDUCK_TOKEN environment variable');
            return;
        }

        // Normalize Black Duck URL (remove protocol and trailing slash)
        const normalizedUrl = bdUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

        // Mask the token in logs
        core.setSecret(bdToken);

        // Log configuration (excluding sensitive data)
        core.info('Configuring Black Duck Notice Generator:');
        core.info(`  Black Duck URL: ${normalizedUrl}`);
        core.info(`  Project Name: ${bdProjectName}`);
        core.info(`  Version Name: ${bdVersionName}`);
        core.info(`  Notice File Path: ${noticeFilePath}`);

        // Initialize Black Duck Notice Service
        const blackduckNotice = new BlackDuckNotice(
            bdToken,
            bdProjectName,
            bdVersionName,
            normalizedUrl
        );

        // Execute requested operations
        if (modifyNoticeFile) {
            core.info('Modifying notice file...');
            await blackduckNotice.modifyNoticeFile(localNoticeFileDirectory, noticeFilePath);
            core.info(`Successfully modified notice file at ${noticeFilePath}`);
        }

        if (generateNoticeFile) {
            core.info('Generating new notice file in Black Duck...');
            await blackduckNotice.createNoticeFile();
            core.info('Successfully triggered notice file generation in Black Duck');
        }

        if (getLatestNoticeFile) {
            core.info('Downloading latest notice file from Black Duck...');
            await blackduckNotice.getLatestNoticeFile(noticeFilePath);
            core.info(`Successfully downloaded notice file to ${noticeFilePath}`);
        }

        // Ensure at least one operation was requested
        if (!modifyNoticeFile && !generateNoticeFile && !getLatestNoticeFile) {
            core.warning('No operations selected. Set at least one of: generate-notice-file, get-latest-notice-file, or modify-notice-file to true');
        }

    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(`Action failed: ${error.message}`);
        } else {
            core.setFailed(`Action failed: ${String(error)}`);
        }
    }
}

run();