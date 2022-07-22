import { chromium, PlaywrightTestConfig }  from "@playwright/test";

const config : PlaywrightTestConfig = {

    timeout: 60000,
    retries : 0,
    testDir : 'tests/E2E',

    use: {

        headless : true,
        viewport  : {width: 1280, height:  720},
        actionTimeout:20000,
        ignoreHTTPSErrors: true,
        video: "off",
        screenshot : "off"
    },
    projects : [

        {
            name : 'chromium',
            use: {browserName: 'chromium'},
        },
        {
            name : 'Firefox',
            use: {browserName: 'firefox'},
        },
        {
            name : 'Webkit',
            use: {browserName: 'webkit'},
        },
    ],
}

export default config