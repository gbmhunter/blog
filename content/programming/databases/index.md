---
author: "gbmhunter"
categories: [ "Electronics", "Databases" ]
date: 2020-07-14
description: "Code examples for MariaDB."
draft: false
lastmod: 2020-07-14
tags: [ "electronics", "databases", "MariaDB", "SQL", "table" ]
title: "Databases"
type: "page"
---

{{% warning-is-notes %}}

## MariaDB

To change the position of a column:

```
ALTER TABLE tbl_name MODIFY COLUMN col_name column_definition AFTER col_name;
```

More info at <https://mariadb.com/kb/en/alter-table/>.