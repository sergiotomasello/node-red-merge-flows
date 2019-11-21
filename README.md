# node-red-merge-flows
Merge two or more node-red flows into one


### Usage

Merges two or more separated json files, with different node-red flows. Writes each flows into one single json file.

```shell

$ node node-red-merge-flows.js --input /Users/sergio/flow1.json --input /Users/sergio/flow2.json --output /Users/sergio/merged.json

```

#### input
you can specify multiple `input` files to merge.

```shell
--input | -i
```

#### output
is the output file.

```shell
--output | -o
```

#### site name
when flows contain dashboards made with `dashboard_ui`, this tools use data like _site name_ and _theme_ from the first flow specified in with the `--input`. If you want to use data from a specific flow, you can use the `--site` option specifying the site name of the flow which contains desired data.
```shell
--site | -s
```
