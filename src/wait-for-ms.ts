async function waitForMs(ms: number): Promise<void> {
    return new Promise((resolve): void => {
        setTimeout((): void => {
            resolve();
        }, ms);
    });
}

export { waitForMs };
