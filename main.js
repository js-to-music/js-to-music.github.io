
const C = 0, D = 1, E = 2, F = 3, G = 4, A = 5, B = 6
const Do = 0, Re = 1, Mi = 2, Fa = 3, Sol = 4, La = 5, Si = 6
const $ = 0.20, $$ = $ + $
function playMyMusic() {
    const sourceCode = document.getElementById("music_code").value
    // document.getElementById('result').innerHTML = ''
    let code = '\n' + sourceCode
    const funcNames = []
    code = code.replace(/\n\s*sleep/g, '\nawait sleep')
    code = code.replace(/\n\s*note/g, '\nawait note')
    code = code.replace(/\n\s*function \w+\s*\(/g, it => {
        const name = it.trim().split('function ')[1].trim().split('(')[0].trim()
        funcNames.push(name)
        return `\nasync function ${name}(`
    })
    for (const func of funcNames) {
        code = code.replace(new RegExp(`\\n\\s*${func}`, 'g'), `\nawait ${func}`)
    }
    try {
        eval(`

            async function playingTheMusic() {

                ${code}

            }

            playingTheMusic()
        `)
    } catch (e) {
        alert(e)
    }

    console.log(code)
}

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination()

const digitsToNotes = 'CDEFGAB'.split('')

function note(note = 0, octave = 4, attackDuration = '8n', timeInterval = 1.0 / 8.0) {
    // const now = Tone.now()
    if (typeof attackDuration === 'bigint')
        attackDuration = `${attackDuration}n`
    else if (typeof attackDuration === 'number')
        attackDuration = `${attackDuration}n`
    let sign = ''
    console.log(Math.round(note * 100))
    if ((Math.round(note * 100) % 100) === 20)
        sign = '#'
    else if ([-20, 80].includes(Math.round(note * 100) % 100))
        sign = 'b'
    else if ((Math.round(note * 100) % 100) === 40)
        sign = 'x'
    else if ([-40, 60].includes(Math.round(note * 100) % 100))
        sign = 'bb'

    if (note < 0)
        octave -= Math.trunc(-(note - 6) / 7)
    else
        octave += Math.trunc((note) / 7)
    const curNote = `${digitsToNotes[((Math.round(note) % 7) + 7) % 7]}${sign}${octave}`


    // document.getElementById('result').innerHTML += curNote + ' '
    var callback = function(stackframes) {
        console.log(stackframes)
        var stringifiedStack = stackframes.map(function(sf) {
            return JSON.stringify(sf)
        }).join('\n');
        console.log(stringifiedStack);
    };
    var errback = function(err) { console.log(err.message); };

    StackTrace.get().then(callback).catch(errback);

    synth.triggerAttackRelease(curNote, attackDuration)
    return new Promise(resolve => setTimeout(resolve, timeInterval * 1000))
}

function sleep(length = 1.0 / 8.0) {
    return new Promise(resolve => setTimeout(resolve, length * 1000))
}

function example(number) {
    const listOfExamples = [
        ``,
        `
/**
 * На этом сайте можно поиграться с основным синтаксисом JavaScript с помощью музыки.
 *
 * Нажмите «Воспроизвести» и послушайте, как работает этот пример.
 *
 * Выше есть кнопки с примерами. Примеры не исчерпывающие, всё ещё стоит учиться по learn.javascript.ru
 *
 * Но здесь можно посмотреть азы азов, если не умеешь программировать вообще, но немного понимаешь музыку.
 */
 
 for (let i = 1; i <= 6; i++) {
    let n1, n2
    if ((i % 2) === 1) {
        n1 = La
        n2 = La-$
    } else {
        n1 = La-$
        n2 = La
    }
    if (i > 4) {
        for (let j = 0; j <= 1; j++) {
            note(La + j, 4)
            note(Si + j, 4)
            sleep(1/16)
            note(Si + j, 4, '8n')
            note(Si + j, 4, '8n')
            note(Si + j, 4)
            sleep()
        }
    }
    note(n1, 4)
    note(Mi, 4)
    note(n1, 4)
    note(Mi, 4)
    note(n1, 4)
    note(n2, 4)
    if (i !== 4 && i !== 6)
        note(n2, 4)
    sleep()
}
        `,
        `
/**
 * Посмотрите как работают ноты
 *
 * note(
 *         Первый аргумент - нота:
 *         C = Do  = 0 - до
 *         D = Re  = 1 - ре
 *         E = Mi  = 2 - ми
 *         F = Fa  = 3 - фа
 *         G = Sol = 4 - соль
 *         A = La  = 5 - ля
 *         B = Si  = 6 - си
 *
 *         +$ - диез
 *         -$ - бемоль
 *
 *         +$$ - дубль диез
 *         -$$ - дубль бемоль
 *
 *         Пример: note(A+$) = A#, note(A-$) = Ab.
 *
 *         Второй аргумент - октава:
 *         0 - Субоктава,
 *         1 - Контроктава,
 *         2 - Большая октава,
 *         3 - Малая октава,
 *         4 - Первая октава,
 *         5 - Вторая октава,
 *         6 - Третья октава,
 *         7 - Четвёртая октава,
 *         8 - Пятая октава
 *
 *         Третий аргумент - длительность атаки
 *         8n - восьмая ноты,
 *         4n - четвёртая ноты и т. д.
 *
 *         Четвёртый аргумент - длительность ноты в секундах
 *         1 - 1 секунда,
 *         0.5 или 1/2 - пол секунды,
 *         0.25 или 1/4 - четверть секунды,
 *     )
 */

/// Ноты можно записывать так
note(Do, 4, 8n, 1/8)
note(La, 4, 8n, 1/8)
note(Si, 4, 4n, 1/4)
sleep()

/// Или так
note(C, 4, 8n, 1/8)
note(A, 4, 8n, 1/8)
note(B, 4, 4n, 1/4)
sleep()

/// Или даже так
note(0, 4, 8n, 1/8)
note(5, 4, 8n, 1/8)
note(6, 4, 4n, 1/4)
sleep()

/// Лишние аргументы можно не писать, 8n и 1/8 стоят по умолчанию
note(B, 4)

/// К нотам можно прибавлять числа, тогда они будут пропорционально сдвинуты. Если надо,
/// сдвиг перепрыгнет на следующие октавы, как в примере ниже:
note(B + 1, 4)
/*   и   */
note(C, 5)
/* звучат одинаково */
sleep()

/// А ещё есть бемоли и диезы:
note(C - $$, 4)
note(C - $, 4)
note(C, 4)
note(C + $, 4)
note(C + $$, 4)

        `,
        `
note(C, 4)
note(D, 4)
note(E, 4)
note(F, 4)
note(G, 4)
note(A, 4)
note(B, 4)
note(C, 5)
sleep()

// Мы можем повторять операции в цилках
for (
    let i = 0; // Объявление переменной и её начальное значение
    i <= 7;            // Условие для выполнения цикла (переменная меньше или равна 7)
    i++                // Как менять переменную между каждой итерацией цикла (увеличивать на 1)
) {
    note(C + i, 4)
}
sleep()

// Обычно записывается просто «for (let i = 0; i <= 7; i++)» без переноса строк

let i = 10

while (i > 0) { // А такой цикл выполняется, пока выполняется условие
    note(C + i, 4)
    i--
}

i = 10
do { // Такой тоже, но он проверяет условие уже в конце итерации, а не в начале
    note(C + i, 4)
    i--
} while (i > 0)
        `,
        `
// Мы можем делать какие-то вещи если выполняется условие
for (let i = 0; i < 15; i++) {
    if ((i % 6) === 0) { // «Если i делится на 6 без остатка»
        note(E, 4)
    } else if ((i % 3) === 0) { // «Если i делится на 3 без остатка»
        note(A, 4)
    } else { // «Иначе»
        note(C, 4)
    }
}
        `,
        `

// Мы можем объединять повторяющиеся фрагменты в именованные функции и выполнять их
function group1() {
    note(D, 4)
    note(D, 4)
    note(C, 4)
    note(B, 4)
}

function group2() {
    note(D, 4)
    note(D, 4)
    note(C, 4)
    note(A, 4)
    sleep()
}
function group3() {
    note(D, 4)
    note(D, 4)
    note(E, 4)
    note(A, 4)
    sleep()
}

group1()
group1()
group2()
group1()
group1()
group3()

        `
    ]
    document.getElementById('music_code').value = listOfExamples[number]
}
