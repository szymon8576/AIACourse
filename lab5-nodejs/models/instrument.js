var db=require('../util/db');

module.exports=class Instrument
{
    constructor(id, name)
    {
        this.id=id;
        this.name=name;
    }

    static getAll()
    {
        return db.execute('select * from instruments');
    }

    static getProdByID(id)
    {
        return db.execute('select * from instruments where id=?',[id]);
    }

    static delByIDs(ids)
    {
        return db.query(`delete from instruments where id IN (${'?'.repeat(ids.length).split('').join(',')})`, ids);
    }
}