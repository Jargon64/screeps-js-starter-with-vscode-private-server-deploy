module.exports.loop = function() {
    for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];
        if (room.energyAvailable >= 200) {
            const spawns = room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_SPAWN }
            });
            spawns.some(spawn => {
                if (spawn.spawning) return false;
                spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], `Harvester-${Game.time}`)
                return true;
            })
        }
    }

    for (const creepName in Game.creeps) {
        const creep = Game.creeps[creepName];

        if (creep.memory.unloading && creep.store.getUsedCapacity() === 0) {
            creep.memory.unloading = false;
        } else if (!creep.memory.unloading && creep.store.getFreeCapacity() === 0) {
            creep.memory.unloading = true;
        }

        if (creep.memory.unloading) {
            const spawns = creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_SPAWN }
            });
            if (spawns.length === 0) continue;

            const spawn = spawns[0];
            if (creep.pos.isNearTo(spawn)) {
                creep.transfer(spawn, RESOURCE_ENERGY);
            } else {
                creep.moveTo(spawn);
            }
        } else {
            const sources = creep.room.find(FIND_SOURCES);
            if (sources.length === 0) continue;

            const source = sources[0];
            if (creep.pos.isNearTo(source)) {
                creep.harvest(source);
            } else {
                creep.moveTo(source);
            }
        }
    }
};
