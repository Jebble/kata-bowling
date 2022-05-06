class BowlingGame {
  static GUTTERBALL = '-';
  static SPARE = '/';
  static STRIKE = 'X';

  constructor() {
    this.score = 0;
    this.rolls = [];
    this.bonusRolls = 0;
  }

  roll(pins) {
    const rollScore = this.getScoreForRoll(pins);
    
    // Only add regular score for the 20 actual rolls - Ignoring bonus rolls for last frames
    if (!this.isGameOver) {
      this.score += rollScore;
    }

    if (this.bonusRolls) {
      let applyBonusTimes = 1;
      if (this.bonusRolls > 2) { // Leftover bonus rolls from previous frame.
        applyBonusTimes = 2;
      }
      this.score += (rollScore * applyBonusTimes);
      this.bonusRolls -= applyBonusTimes;
    }

    this.setBonusRolls(pins);
  }

  getScoreForRoll(pins) {
    switch(pins) {

      case BowlingGame.GUTTERBALL:
        this.rolls.push(0);
        return 0;

      case BowlingGame.SPARE:
        const spareScore = (10 - this.rolls[this.rolls.length - 1]);
        this.rolls.push(spareScore);
        return spareScore;

      case BowlingGame.STRIKE:
        // Had an issue deciding when the game was over, so I added a 0 roll for every strike.
        this.rolls = [...this.rolls, 0, 10];
        return 10;

      default:
        const score = parseInt(pins);
        this.rolls.push(score)
        return score;
    }
  }

  setBonusRolls(roll) {
    if (this.isGameOver) return // No bonus rolls are granted for the last frame bonusses
    if (roll === '/') this.bonusRolls += 1;
    if (roll === 'X') this.bonusRolls += 2;
  }

  get isGameOver() {
    return this.rolls.length > 20
  }

  get totalScore() {
    return this.score
  }
}

module.exports = BowlingGame;