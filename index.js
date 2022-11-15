import fetch from "node-fetch"
import { Sequelize, Model, DataTypes } from 'sequelize';

const getList = (cursor = "") => {
  return fetch(`https://osu.ppy.sh/beatmapsets/search?cursor_string=${cursor}`).then(e => e.json())
}

const sequelize = new Sequelize('sqlite://output.db');

const Beatmap = sequelize.define('Beatmap', {
  id: {
	type: DataTypes.INTEGER,
	primaryKey: true
  },
  difficulty: DataTypes.REAL,
  length: DataTypes.INTEGER,
  status: DataTypes.CHAR,
  mode_int: DataTypes.TINYINT,
});

const Var = sequelize.define('Var', {
  key: {
	type: DataTypes.CHAR,
	primaryKey: true
  },
  value: DataTypes.CHAR,
});

await sequelize.sync()

let last = await Var.findOne({ where: { key: "last" } })

if (last === null) {
  last = await Var.create({ key: "last", value: "" })
}

while (true) {
  let { beatmapsets, cursor_string } = await getList(last.value)
  if (beatmapsets.length === 0) {
	break
  }
  
  const t = await sequelize.transaction();
  for (const set of beatmapsets) {
	for (const beatmap of set.beatmaps) {
	  await Beatmap.create({
		id: beatmap.id,
		difficulty: beatmap.difficulty_rating,
		length: beatmap.total_length,
		status: beatmap.status,
		mode_int: beatmap.mode_int
	  }, { transaction: t })
	}
  }
  t.commit()

  last.value = cursor_string
  last.save()


}
console.log("done")
