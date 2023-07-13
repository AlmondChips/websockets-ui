import { Coordinate } from '../dataBase/games';

export const randomizeAttack = (): Coordinate => {
  return { x: getRandomInt(0, 10), y: getRandomInt(0, 10) };
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
