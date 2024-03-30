import type { FC } from 'hono/jsx';

import { gitHash, gitDate } from '@/utils/git-hash';

const Layout: FC = (props) => (
    <html>
        <head>
            <title>Welcome to RSSHub!</title>
            <script src="/3.4.3.js"></script>
            <style>
                {`
                details::-webkit-scrollbar {
                    width: 0.25rem;
                }
                details::-webkit-scrollbar-thumb {
                    border-radius: 0.125rem;
                    background-color: #e4e4e7;
                }
                details::-webkit-scrollbar-thumb:hover {
                    background-color: #a1a1aa;
                }`}
            </style>
        </head>
        <body className="antialiased text-zinc-700">{props.children}</body>
    </html>
);

const Index: FC<{
    requestPath: string;
    message: string;
    errorRoute: string;
    nodeVersion: string;
}> = ({
    requestPath,
    message,
    errorRoute,
    nodeVersion,
}) => (
        <Layout>
            <div
                className="pointer-events-none absolute w-full h-screen"
                style={{
                    backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMiAzMicgd2lkdGg9JzMyJyBoZWlnaHQ9JzMyJyBmaWxsPSdub25lJyBzdHJva2U9J3JnYigxNSAyMyA0MiAvIDAuMDQpJz48cGF0aCBkPSdNMCAuNUgzMS41VjMyJy8+PC9zdmc+')`,
                    maskImage: 'linear-gradient(transparent, black, transparent)',
                }}
            ></div>
            <div className="w-full h-screen flex items-center justify-center flex-col space-y-4">
                <img className="grayscale" src="/logo.png" alt="RSSHub" width="100" loading="lazy" />
                <h1 className="text-4xl font-bold">
                    Looks like something went wrong
                </h1>
                <div className="text-left w-[800px] space-y-6 !mt-10">
                    <div className="space-y-2">
                        <p className="mb-2 font-bold">Helpful Information</p>
                        <p className="message">Error Message:<br /><code className="mt-2 block max-h-28 overflow-auto bg-zinc-100 align-bottom w-fit details">{message}</code></p>
                        <p className="message">Route: <code className="ml-2 bg-zinc-100">{errorRoute}</code></p>
                        <p className="message">Full Route: <code className="ml-2 bg-zinc-100">{requestPath}</code></p>
                        <p className="message">Node Version: <code className="ml-2 bg-zinc-100">{nodeVersion}</code></p>
                        <p className="message">Git Hash: <code className="ml-2 bg-zinc-100">{gitHash}</code></p>
                        <p className="message">Git Date: <code className="ml-2 bg-zinc-100">{gitDate?.toUTCString()}</code></p>
                    </div>
                    <div>
                        <p className="mb-2 font-bold">Report</p>
                        <p>After carefully reading the <a className="text-[#F5712C]" href="https://moeyy.cn/rsshub/" target="_blank">document</a>, if you think this is a bug of RSSHub, please <a className="text-[#F5712C]" href="https://github.com/DIYgod/RSSHub/issues/new?assignees=&labels=RSS+bug&template=bug_report_en.yml" target="_blank">submit an issue</a> on GitHub.</p>
                        <p>在仔细阅读<a className="text-[#F5712C]" href="https://moeyy.cn/rsshub/zh/" target="_blank">文档</a>后，如果你认为这是 RSSHub 的 bug，请在 GitHub <a className="text-[#F5712C]" href="https://github.com/DIYgod/RSSHub/issues/new?assignees=&labels=RSS+bug&template=bug_report_zh.yml" target="_blank">提交 issue</a>。</p>
                    </div>
                </div>
            </div>
        </Layout>
    );

export default Index;
