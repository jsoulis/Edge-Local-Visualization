let newData = {};

async function getFirstBulkData(num) {
    let bulk = [];
    let time = Date.now() - num*5;
    while(num > 0) {
        time += 5 
        bulk.unshift(
            {
                Timestamp: time,
                Value: Math.random()*10
            }
        )
        num--
    }
    return bulk;
}

async function getSimulatorData() {
    return {
        Timestamp: Date.now(),
        Value: Math.random() * 10 
    }
}

async function updateAsync() {
    let data = await getSimulatorData();
    updateData(data);
}

let updateData = (data) => {
    newData = data;
}

async function printData() {
    await updateAsync();
    //consume New Data here for simulation purposes
    console.log(newData);
    setTimeout(printData, 3000);
}
//setTimeout(printData, 3000);