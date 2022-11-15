# Use
```
npm i
node .
```

# SQL Schema
```
CREATE TABLE `Beatmaps` (`id` INTEGER PRIMARY KEY, `difficulty` REAL, `length` INTEGER, `status` CHAR(255), `mode_int` TINYINT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
```
mode values:
```
  0 - osu
  1 - taiko
  2 - ctb
  3 - mania
```
the length is presented in seconds

# Ready results
When the result is ready, I will post it in the discord: https://discord.gg/TsV8yTwkrB

# License
This code is licensed under the MIT license.

Please see the licence file for more information.
