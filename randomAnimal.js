import WebSocket from 'ws';

class AnimalGenerator {
  #ws;
  #intervalId;
  static ANIMALS = ["cat", "dog", "mouse", "horse", "fox"];

  constructor(ws) {
    this.#ws = ws;
    this.#intervalId = null;
  }

  static getRandomAnimal() {
    const randomIndex = Math.floor(Math.random() * AnimalGenerator.ANIMALS.length);
    return AnimalGenerator.ANIMALS[randomIndex];
  }

  start() {
    this.#ws.send(AnimalGenerator.getRandomAnimal());
    this.intervalId = setInterval(() => {
      if (this.#ws?.readyState === WebSocket.OPEN) {
        this.#ws.send(AnimalGenerator.getRandomAnimal());
      }
    }, 5000);
  }
  
  stop() {
    clearInterval(this.#intervalId);
  }
}

export const getAnimalGenerator = (ws) => {
  return new AnimalGenerator(ws);
}