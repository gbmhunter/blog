#!/usr/bin/env bash
cat data.json | jq '.'
cat data.json | jq 'keys'
cat data.json | jq '.["my_array"]'
cat data.json | jq '.["my_obj"] | length'