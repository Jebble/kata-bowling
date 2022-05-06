const BowlingGame = require('./BowlingGame')

const scoringExamples = [
  // Each game, or “line” of bowling, includes ten turns, or “frames” for the bowler.
  // In each frame, the bowler gets up to two tries to knock down all the pins.
  // If in two tries, he fails to knock them all down, his rolls for that frame is
  // the total number of pins knocked down in his two tries.
  {
    type: 'score on first roll',
    rolls: '1- -- -- -- -- -- -- -- -- --',
    expectedScore: 1,
  },
  {
    type: 'different score on first roll',
    rolls: '2- -- -- -- -- -- -- -- -- --',
    expectedScore: 2,
  },
  {
    type: 'two roll score on first frame',
    rolls: '22 -- -- -- -- -- -- -- -- --',
    expectedScore: 4,
  },
  {
    type: 'score on all frames',
    rolls: '1- 1- 1- 1- 1- 1- 1- 1- 1- 1-',
    expectedScore: 10,
  },
  {
    type: 'two roll score on all frames',
    rolls: '11 11 11 11 11 11 11 11 11 11',
    expectedScore: 20
  },
  // If in two tries he knocks them all down, this is called a “spare” and his rolls for the frame is
  // ten plus the number of pins knocked down on his next throw (in his next turn).
  {
    type: 'spare on first roll',
    rolls: '5/ -- -- -- -- -- -- -- -- --',
    expectedScore: 10
  },
  {
    type: 'spare on first roll, adds points of next roll',
    rolls: '5/ 5- -- -- -- -- -- -- -- --',
    expectedScore: 20
  },
  {
    type: 'two spares in a row',
    rolls: '5/ 5/ 5- -- -- -- -- -- -- --',
    expectedScore: 35,
  },
  {
    type: 'a spare only adds the points of the next roll',
    rolls: '5/ -5 -- -- -- -- -- -- -- --',
    expectedScore: 15,
  },
  // If on his first try in the frame he knocks down all the pins, this is called a “strike”. His turn is over,
  // and his rolls for the frame is ten plus the simple total of the pins knocked down in his next two rolls.
  {
    type: 'strike on first roll',
    rolls: 'X -- -- -- -- -- -- -- -- --',
    expectedScore: 10
  },
  {
    type: 'strike on first roll, adds the points of next two rolls ',
    rolls: 'X 54 -- -- -- -- -- -- -- --',
    expectedScore: 28
  },
  {
    type: 'two strikes in a row',
    rolls: 'X X -- -- -- -- -- -- -- --',
    expectedScore: 30
  },
  {
    type: 'two strikes in a row plus extra rolls',
    rolls: 'X X 5- -- -- -- -- -- -- --',
    expectedScore: 45
  },
  // If he gets a spare or strike in the last (tenth) frame, the bowler gets to throw one or two more bonus balls, respectively.
  // These bonus throws are taken as part of the same turn.
  // If the bonus throws knock down all the pins, the process does not repeat:
  // the bonus throws are only used to calculate the rolls of the final frame.
  {
    type: 'bonus points for a spare',
    rolls: '-- -- -- -- -- -- -- -- -- 5/5',
    expectedScore: 15
  },
  {
    type: 'bonus points for a strike',
    rolls: '-- -- -- -- -- -- -- -- -- X54',
    expectedScore: 19
  },
  {
    type: 'no score',
    rolls: '-- -- -- -- -- -- -- -- -- --',
    expectedScore: 0
  },
  {
    type: 'alternating spares/strikes',
    rolls: '5/ X 5/ X 5/ X 5/ X 5/ XXX',
    expectedScore: 210
  },
  {
    type: 'maximum rolls',
    rolls: 'X X X X X X X X X XXX',
    expectedScore: 300
  },
  {
    type: 'a partial game',
    rolls: '-6 X 5/ 7/',
    expectedScore: 53
  },
];

describe.each(scoringExamples)('A BowlingGame', ({ type, rolls, expectedScore }) => {
  it(`with ${type} should return a score of ${expectedScore}`, () => {
    const game = new BowlingGame();

    const frames = rolls.split(' ')
    frames.forEach((frame) => {
      for (let roll of frame) {
        game.roll(roll)
      }
    })

    expect(game.totalScore).toBe(expectedScore);
  });
});