---
authors: [ Geoffrey Hunter ]
categories: [ Programming, Databases ]
date: 2020-07-14
description: Code examples for SQL, MariaDB and PostgreSQL.
draft: false
lastmod: 2022-07-01
tags: [ programming, databases, MariaDB, SQL, table, PostgreSQL, inheritance, object-orientated databases, records ]
title: Databases
type: page
---

{{% warning-is-notes %}}

## SQL

A _record_ is the definition for a row in a table. 

### Inserting A Record

To insert a record into a table, use the SQL `INSERT` command. Let's say we wanted to add a person called `josh` to the `people` table:

```sql
INSERT INTO people(name)
VALUES('josh');
```

To do the same thing from Python:

```python
cur.execute('INSERT INTO people(name) VALUES(%s);', ('josh',))
conn.commit()
```

### Updating A Record

The SQL command `UPDATE` is used to update existing records (table rows). Suppose we wanted to update the age of all people named `ben` to `11`:

```sql
UPDATE people SET age=11 WHERE name=ben
```

To do the same thing in Python:

```python
cur.execute(f'UPDATE people SET age=%s WHERE name=%s', (age, name, ))
conn.commit()
```

## MariaDB

To change the position of a column:

```sql
ALTER TABLE tbl_name MODIFY COLUMN col_name column_definition AFTER col_name;
```

More info at <https://mariadb.com/kb/en/alter-table/>.

## PostgreSQL

PostgreSQL is a _object-orientated_ database. The main feature of a _object-orientated_ database is that tables can inherit from other tables, which means they automatically get all the data columns of the table they inherit from (similar to object inheritance in _object-orientated_ programming languages).

Inheritance is defined when creating tables with the `INHERITS` clause with the `CREATE TABLE` statement:

```sql
CREATE TABLE people (
    name            text,
    age             int
);

CREATE TABLE student (
    student_id      text,
) INHERITS (people);
```

If a table already exists, you can inheritance via the `INHERIT` variant of the `ALTER TABLE` statement.

### Working With PostgreSQL In Python

One of the most popular PostgreSQL libraries for Python is `psycopg2`. To install it on Ubuntu you will also need the `libpg-dev` package on your system:

```bash
sudo apt install libpq-dev
pip install psycopg2
```

