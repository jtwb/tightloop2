const ProgressBar = require('progress');


/*
 *
 * * Behavior constants * */
const TARGET_BATCH_DELAY = 250;
const BATCH_MAX = 100000;
const BATCH_INITIAL_SIZE = 2;


/*
 *
 * * UI Support code * */
let ui_progressbar;
let ui_ticks_total;
let ui_ticks_done = 0;
function progress(t_init, t_now, t_last) {
    if (!ui_progressbar) {
        const total = ui_ticks_total = Math.ceil((t_last - t_init) / TARGET_BATCH_DELAY);
        ui_progressbar = new ProgressBar('├:bar┤ :percent :elapseds', {
            total,
            complete: '█',
            incomplete: ' '
        });
    }
    if (ui_progressbar.complete) {
        return;
    }
    const new_steps = Math.ceil((t_now - t_init) / TARGET_BATCH_DELAY) - ui_ticks_done;
    for (let i=0; i < new_steps; i++) {
        ui_progressbar.tick();
    }
    ui_ticks_done += new_steps;
}


/*
 *
 * * Private methods * */
function now() { return +(new Date()); }

/*
 *
 * * Core function * */
function tightloop(testCase, { duration=4000, ui=false }={}) {
    /*
     * Run `testCase` in a tight loop until `duration` ms have passed.
     *
     * `duration` is measured in ms
     */
    const t_init = now();
    const t_stop = t_init + duration;
    let batch = BATCH_INITIAL_SIZE;
    let t_last = t_init;
    let t_end;
    let runs = 0;

    for (let i=1, done=false; !done; i++, runs++) {
        testCase();
        if (i % batch === 0) {
            let t_now = now();
            batch = Math.floor((TARGET_BATCH_DELAY * i) / Math.max(1, (t_now - t_last)));
            batch = Math.max(1, Math.min(BATCH_MAX, batch));
            done = t_stop < t_now;

            ui && progress(t_init, t_now, t_stop);

            t_last = ui ? now() : t_now;
            i = 1;
        }
    }

    t_end = now();
    console.log({ mean_avg_ms: (t_end - t_init) / runs, runs: runs, elapsed_ms: t_end - t_init });
}

module.exports = tightloop;
