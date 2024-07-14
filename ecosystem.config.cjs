// ecosystem.config.cjs
module.exports = {
    apps: [
        {
            name: 'LoL',
            script: './build/index.js',
            instances: 2,
            exec_mode: 'cluster',
            watch: true,
            ignore_watch: ['node_modules', 'logs', 'build', 'dist'],
            merge_logs: true,
            autorestart: true,
            max_memory_restart: "1G",
            env: {
                PORT: 9090,
            },
            env_production:{
                PORT: 9090,
                NODE_ENV:"production"
            },
            output: './logs/out.log',
            error: './logs/error.log',
            log: './logs/combined.log',
            time: true
        }
    ]
};
