// ecosystem.config.cjs
module.exports = {
    apps: [
        {
            name: 'LoL',
            script: './build/index.js',
            instances: 2,
            exec_mode: 'cluster',
            merge_logs: true,
            autorestart: true,
            watch: true,
            max_memory_restart: "512M",
            env: {
                PORT: 9090,
            }
        }]
};
