/**
 * set: function to add a key value pair (it updates if key is already in)
 * get: returns value coresponding to the key or null if it is not there
 * remove: removes the key value pair corresponding to given key
 */
 class SymbolTable {
  constructor() {
    this.table = new Array(1000);
    this.size = 0;
    this.length = 1000;
  }

  hash(key) {
    key = key.toString();
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.table.length;
  }

  set(key, value) {

    const index = this.hash(key);
    // console.log('sets: ' + index)
    this.table[index] = this.table[index] ? [...this.table[index].filter(el => el[0] !== key), [key, value]] : [[key, value]]
    // console.log(this.table[index], index)
    this.size++;
    return value
  }

  get(key) {
    const target = this.hash(key)
    const keyVal = this.table[target]?.find(el => el[0] === key)
    // console.log('get: ' + target, this.table[target], key, keyVal)

    return keyVal ? keyVal[1] : null
  }

  remove(key) {
    const index = this.hash(key);

    if (this.table[index] && this.table[index].length) {
      const posision = this.table[index].indexOf(key)
      this.table[index] = this.table[index].filter(el => el[0] !== key)
      /* console.log(this.table[index], posision) */ 
      /* arrthis.table[index].splice(posision, 1) */
      this.size--;
      return true;
    } else {
      return false;
    }
  }
}

var symbolTable = new SymbolTable()

const tokens = 'def BOF EOF if then else and or screen is plus minus dividedBy or < <= > >= = ,'.split(' ')
const separators = ', [ { ('.split(' ')
separators.push(' ')
program = `
BOF
Def (a nice vaR1able), first is 1, second is 2
scree.get[(a nice vaR1able)]
as [(a nice vaR1able) < first and a != first]
first, second = second, first + second
screen[a = first then {YES} else {NO}
EOF`
// const b = 'adddd b'.split(' ')w
// console.log(tokens)
program = program.replace(/\s+/g, ' ').replace(/\n/g, " ")
console.log(program)

const getIdentifier = (string, index, endSeparator) => {
  let identifier = ''
  while (string[index] !== endSeparator) {
    identifier += string[index++]
  }
  return [identifier, index]
}

const addIdentifier = (identifier, fip, stIndex) => {
  identifier = identifier.trim()
  const index = symbolTable.get(identifier)

  if (index === null) {
    fip.push([identifier, -1])
    symbolTable.set(identifier, identifier) 
    console.log('adde', identifier)
  }
  // console.log(identifier)
}

const parse = (program, tokens) => {
  let fip = [], stIndex = 0
  for (let i = 0; i < program.length; i++) {
    let word = program[i]
    if (program[i] === '(') {
      [identifier, i] = getIdentifier(program, ++i, ')')
      // const index = symbolTable.get(identifier)

      addIdentifier(identifier, fip, stIndex)
      // console.log(identifier)
      
    }

    else if (program[i] === '{') {
      [identifier, i] = getIdentifier(program, ++i, '}')
      // const index = symbolTable.get(identifier)

      addIdentifier(identifier, fip, stIndex)
      // console.log(identifier)
      
    }
    else if (/^\d$/.test(program[i])) {
      [identifier, i] = getIdentifier(program, i, ' ')
      // const index = symbolTable.get(identifier)

      addIdentifier(identifier, fip, stIndex)
      // console.log(identifier)
      
    }
    else {
      i++
      while (program[i] !== ' ' && program[i] !== '(' && program[i] !== '[' && program[i] !== ',' && i < program.length)
        word += program[i++]
      if (tokens.indexOf[word] === -1) {
        console.log(`-----Syntax error in word ${word}`)
      }
      fip.push([word, 0])
    }
    
  }
  console.log(fip)
}

parse(program, tokens)
console.log(separators)