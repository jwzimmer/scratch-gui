/* eslint-env jest */

import path from 'path';
import {
    clickText,
    clickXpath,
    driver,
    findByXpath,
    getLogs
} from '../helpers/selenium-helpers';

const uri = path.resolve(__dirname, '../../build/index.html');

const errorWhitelist = [
    'The play() request was interrupted by a call to pause()'
];

describe('Adding non-block assets to a project', () => {
    afterAll(async () => {
        await driver.quit();
    });

    test('Adding a costume', async () => {
        await driver.get('file://' + uri);
        await clickText('Costumes');
        await clickText('Add Costume');
        const el = await findByXpath("//input[@placeholder='what are you looking for?']");
        await el.sendKeys('abb');
        await clickText('abby-a'); // Should close the modal, then click the costumes in the selector
        await clickText('costume1');
        await clickText('abby-a');
        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });

    test('Adding a sound', async () => {
        await driver.get('file://' + uri);
        await clickText('Sounds');
        await clickText('Add Sound');
        const el = await findByXpath("//input[@placeholder='what are you looking for?']");
        await el.sendKeys('chom');
        await clickText('chomp'); // Should close the modal, then click the sounds in the selector
        await clickText('meow');
        await clickText('chomp');
        await clickXpath('//button[@title="Play"]');
        await clickText('meow');
        await clickXpath('//button[@title="Play"]');

        await clickText('Louder');
        await clickText('Softer');
        await clickText('Faster');
        await clickText('Slower');
        await clickText('Robot');
        await clickText('Echo');
        await clickText('Reverse');

        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });
});
