const loggingEnabled = true;

export const log = (message: string) => {
    if (!loggingEnabled) {
        return;
    }

    console.log(message);
}