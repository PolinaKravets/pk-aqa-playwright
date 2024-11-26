
class AuthData {
    constructor(page, context, baseUrl = 'https://qauto.forstudy.space') {
        this.page = page;
        this.context = context;
        this.baseUrl = baseUrl;
    }

    get url() {
        return this.baseUrl;
    }

    async navigateToMainPageWithAuth(credentials = { username: "guest", password: "welcome2qauto" }) {
        // Используем встроенную аутентификацию Playwright
        const context = await this.page.context();
        await context.setExtraHTTPHeaders({
            Authorization: 'Basic ' + Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64'),
        });

        await this.page.goto(this.url);
    }
}

export default AuthData;