const fs = require("fs");

exports.getAll = () => {

  // const obj = JSON.parse(req.body);

  // fs.writeFile('grades.json', obj, 'utf8', () => {
  // });
  // fs.readFile('grades.json', 'utf-8', (err, data) => {
  //   if (err) throw err

  //   console.log(data);
  // });
}

exports.register = async (req, res) => {
  let id = 0;

  fs.readFile('grades.json', 'utf-8', async (err, data) => {
    if (err) throw err
    let dados = JSON.parse(data);
    id = dados["nextId"];

    const obj = {
      "id": id,
      "student": req.body.student,
      "subject": req.body.subject,
      "type": req.body.type,
      "value": req.body.value,
      "timestamp": "2020-05-19T18:21:24.964Z"
    }
    dados["nextId"] = ++id;
    dados["grades"].push(obj);
    fs.writeFile('grades.json', JSON.stringify(dados), (err) => {
      if (err) throw err;
      console.log('Saved!');
    });

  });

  res.status(200).send(req.body);
}

exports.update = async (req, res) => {

  fs.readFile('grades.json', 'utf-8', async (err, data) => {
    if (err) throw err
    let dados = JSON.parse(data);

    for (let index = 0; index < dados["grades"].length; index++) {
      // console.log(dados["grades"][index]);
      // console.log(req.body.id);
      if (dados["grades"][index].id == req.body.id) {
        dados["grades"][index].student = req.body.student;
        dados["grades"][index].subject = req.body.subject;
        dados["grades"][index].type = req.body.type;
        dados["grades"][index].value = req.body.value;
        dados["grades"][index].timestamp = "2020-05-19T18:21:24.964Z";
      }
    }
    console.log(dados);

    fs.writeFile('grades.json', JSON.stringify(dados), (err) => {
      if (err) throw err;
      console.log('Saved!');
    });

  });

  res.status(200).send(req.body);
}

exports.delete = async (req, res) => {

  fs.readFile('grades.json', 'utf-8', async (err, data) => {
    if (err) throw err
    let dados = JSON.parse(data);

    for (let index = 0; index < dados["grades"].length; index++) {
      if (dados["grades"][index].id == req.body.id) {
        dados["grades"].splice(index, 1);
      }
    }
    console.log(dados);

    fs.writeFile('grades.json', JSON.stringify(dados), (err) => {
      if (err) throw err;
      console.log('Saved!');
    });

  });

  res.status(200).send(req.body);
}

exports.findById = async (req, res) => {

  fs.readFile('grades.json', 'utf-8', async (err, data) => {
    if (err) throw err
    let dados = JSON.parse(data);
    var result;
    for (let index = 0; index < dados["grades"].length; index++) {
      if (dados["grades"][index].id == req.body.id) {
        result = dados["grades"][index];
      }
    }
    res.status(200).send(result);
  });
}

exports.somaNotas = async (req, res) => {

  fs.readFile('grades.json', 'utf-8', async (err, data) => {
    if (err) throw err
    let dados = JSON.parse(data);
    var total = 0;
    for (let index = 0; index < dados["grades"].length; index++) {
      if (dados["grades"][index].student === req.body.student &&
        dados["grades"][index].subject === req.body.subject) {
        total += dados["grades"][index].value;
      }
    }
    res.status(200).send(`Total:${total}`);
  });
}

exports.calcMediaSubjects = async (req, res) => {

  fs.readFile('grades.json', 'utf-8', async (err, data) => {
    if (err) throw err
    let dados = JSON.parse(data);
    var total = 0;
    var indice = 0;
    for (let index = 0; index < dados["grades"].length; index++) {
      if (dados["grades"][index].type === req.body.type &&
        dados["grades"][index].subject === req.body.subject) {
        total += dados["grades"][index].value;
        indice++;
      }
    }
    res.status(200).send(`Indice: ${indice} Media:${total / indice}`);
  });
}

exports.getTopNotas = async (req, res) => {

  fs.readFile('solicitacoes.json', 'utf-8', async (err, data) => {
    if (err) throw err
    let dados = JSON.parse(data);
    var arr = [];
    var indice = 0;
    for (let index = 0; index < dados.length; index++) {
      arr.push(dados[index]);

    }
    // for (let index = 0; index < dados["grades"].length; index++) {
    //   if (dados["grades"][index].type === req.body.type &&
    //     dados["grades"][index].subject === req.body.subject) {
    //     arr.push(dados["grades"][index]);

    //   }
    // }

    arr.sort((a, b) => {
      var x = a.departamento.toLowerCase();
      var y = b.departamento.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    fs.writeFile('solicitacao.json', JSON.stringify(arr), (err) => {
      if (err) throw err;
      console.log('Saved!');
    });
    res.status(200).send(arr);
  });
}