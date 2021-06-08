import readline from 'readline';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export async function exit() {
    rl.close();
    process.exit(0);
}

export function questionAsync(question: string, isValid?: (answer: string) => boolean): Promise<string> {
    return new Promise<string>(
        (resolve, reject) => {
            rl.question(question, (answer) => {
                if (!isValid) {
                    resolve(answer);
                    return;
                }

                if (isValid(answer)) {
                    resolve(answer);
                }

                reject(new Error(`${answer} is not valid according to ${isValid}`));
            });
        },
    );
}