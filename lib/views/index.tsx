import type { FC } from 'hono/jsx';

import { Layout } from '@/views/layout';
import { config } from '@/config';
import { gitHash, gitDate } from '@/utils/git-hash';
import { getDebugInfo } from '@/utils/debug-info';

const startTime = Date.now();

const Index: FC<{ debugQuery: string | undefined }> = ({ debugQuery }) => {
    const debug = getDebugInfo();

    const showDebug = !config.debugInfo || config.debugInfo === 'false' ? false : config.debugInfo === 'true' || config.debugInfo === debugQuery;
    const { disallowRobot, nodeName, cache } = config;

    const duration = Date.now() - startTime;

    const info = {
        showDebug,
        disallowRobot,
        debug: [
            ...(nodeName
                ? [
                    {
                        name: 'Node Name',
                        value: nodeName,
                    },
                ]
                : []),
            ...(gitHash
                ? [
                    {
                        name: 'Git Hash',
                        value: (
                            <a className="underline" href={`https://github.com/DIYgod/RSSHub/commit/${gitHash}`}>
                                {gitHash}
                            </a>
                        ),
                    },
                ]
                : []),
            ...(gitDate
                ? [
                    {
                        name: 'Git Date',
                        value: gitDate.toUTCString(),
                    },
                ]
                : []),
            {
                name: 'Cache Duration',
                value: cache.routeExpire + 's',
            },
            {
                name: 'Request Amount',
                value: debug.request,
            },
            {
                name: 'Request Frequency',
                value: ((debug.request / (duration / 1000)) * 60).toFixed(3) + ' times/minute',
            },
            {
                name: 'Cache Hit Ratio',
                value: debug.request ? ((debug.hitCache / debug.request) * 100).toFixed(2) + '%' : 0,
            },
            {
                name: 'ETag Matched Ratio',
                value: debug.request ? ((debug.etag / debug.request) * 100).toFixed(2) + '%' : 0,
            },
            {
                name: 'Health',
                value: debug.request ? ((1 - debug.error / debug.request) * 100).toFixed(2) + '%' : 0,
            },
            {
                name: 'Uptime',
                value: (duration / 3_600_000).toFixed(2) + ' hour(s)',
            },
            {
                name: 'Hot Routes',
                value: Object.keys(debug.routes)
                    .sort((a, b) => debug.routes[b] - debug.routes[a])
                    .slice(0, 30)
                    .map((route) => (
                        <>
                            {debug.routes[route]} {route}
                            <br />
                        </>
                    )),
            },
            {
                name: 'Hot Paths',
                value: Object.keys(debug.paths)
                    .sort((a, b) => debug.paths[b] - debug.paths[a])
                    .slice(0, 30)
                    .map((path) => (
                        <>
                            {debug.paths[path]} {path}
                            <br />
                        </>
                    )),
            },
            {
                name: 'Hot Error Routes',
                value: Object.keys(debug.errorRoutes)
                    .sort((a, b) => debug.errorRoutes[b] - debug.errorRoutes[a])
                    .slice(0, 30)
                    .map((route) => (
                        <>
                            {debug.errorRoutes[route]} {route}
                            <br />
                        </>
                    )),
            },
            {
                name: 'Hot Error Paths',
                value: Object.keys(debug.errorPaths)
                    .sort((a, b) => debug.errorPaths[b] - debug.errorPaths[a])
                    .slice(0, 30)
                    .map((path) => (
                        <>
                            {debug.errorPaths[path]} {path}
                            <br />
                        </>
                    )),
            },
        ],
    };

    return (
        <html>
            <head>
                <meta http-equiv="refresh" content="0;URL=https://moeyy.cn/rsshub/"></meta>
            </head>
        </html>
    );
};

export default Index;
