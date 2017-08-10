/* eslint-env jest */
/* globals Promise */

import path from 'path';
import {
    clickText,
    clickButton,
    clickXpath,
    driver,
    findByXpath,
    getLogs
} from '../helpers/selenium-helpers';

const uri = path.resolve(__dirname, '../../build/index.html');

const errorWhitelist = [
    'The play() request was interrupted by a call to pause()'
];

describe('Loading & editing projects', () => {
    afterAll(async () => {
        await driver.quit();
    });

    test('Load a project by ID', async () => {
        const projectId = '96708228';
        await driver.get('file://' + uri + '#' + projectId);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await clickXpath('//img[@title="Go"]');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await clickXpath('//img[@title="Stop"]');
        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });

    test('Creating variables', async () => {
        await driver.get('file://' + uri);
        await clickText('Blocks');
        await clickText('Data');
        await clickText('Create variable...');
        let el = await findByXpath("//input[@placeholder='']");
        await el.sendKeys('score');
        await clickButton('OK');
        await clickText('Create variable...');
        el = await findByXpath("//input[@placeholder='']");
        await el.sendKeys('second variable');
        await clickButton('OK');
        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });
});