import path from 'path';
import moveFile from 'move-file';
import { pathExists } from './path-exists';
import { waitForMs } from './wait-for-ms';

interface Params {
    overwrite: boolean;
}

interface Result {
    [key: string]: string;
}

function toTypescript(pathname: string): string {
    const { name } = path.parse(pathname);

    const updated = `${name}.ts`;

    return updated;
}

async function renameFilesToTypescript({ overwrite }: Params): Promise<Result> {
    const files = ['base1.js', 'already-exists.js', 'already-exists.ts'];

    interface FilesRenamed {
        src: string;
        dest: string;
    }

    const pending = files.map(
        async (filename): Promise<FilesRenamed> => {
            const updatedFilename = toTypescript(filename);

            const exists = await pathExists(updatedFilename);
            if (overwrite === false && exists === true) {
                throw new Error(
                    `${filename} -> ${updatedFilename}: file already exists`,
                );
            }

            // add wait here to consistently show error
            await waitForMs(100);
            /**
             * the first file on the list does not exist so it will succeed
             * causing this to happen after test completes
             */
            await moveFile(filename, updatedFilename, { overwrite });

            return { src: filename, dest: updatedFilename };
        },
    );

    const renamed = await Promise.all(pending);

    const result = renamed.reduce((acc, { src, dest }): Result => {
        return { ...acc, [src]: dest };
    }, {});

    return result;
}

export { renameFilesToTypescript };
