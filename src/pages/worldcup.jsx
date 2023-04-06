import { useEffect } from "react";
import animalData from "../animalData.json";
import { useState } from "react";
import AnimalCard from "../components/AnimalCard";
import WinAnimalCard from "../components/WinAnimalCard";

const Worldcup = () => {
  const [shuffleAnimal, setShuffleAnimal] = useState();
  const [choice, setChoice] = useState(0);
  const [nextRound, setNextRound] = useState([]);
  const [end, setEnd] = useState(16);

  const onClickChoice = (v) => () => {
    // (v) => () => {} 이건 2차 함수임!! 함수안의 함수. AnimalCard에서 onClickChoice 함수안에(animal)이라는 값을 주기 위함
    setChoice(choice + 2);
    // [기존에 선택된 요소들, 새로 추가한 동물(v)]
    setNextRound([...nextRound, v]);
    // nextRound는 push를 쓸 수 있지만, setNextRound는 함수라서 push 메소드 못씀.
    // setNextRound([...nextRound, v]) 로 하면 푸시로 담김!! ... 문법은 배열울 스프레드 하는 것.
  };

  useEffect(() => {
    let shuffleAnimalData = animalData.sort(() => {
      return Math.random() - 0.5;
    });

    setShuffleAnimal(shuffleAnimalData);
  }, []);

  useEffect(() => console.log(nextRound), [nextRound]);

  useEffect(() => {
    if (choice === end) {
      console.log(`${end}강 종료`);
      // nextRound에 담긴 동물배열들을 suffleAnimal로 옮김
      setShuffleAnimal(nextRound);
      // nextRound 초기화[]
      setNextRound([]);
      // 16강 -> 8강
      setEnd(end / 2);
      // choice 값 0으로 변화
      setChoice(0);
    }
  }, [choice]);

  return (
    <div className="bg-pink-200 min-h-screen flex justify-center items-center">
      {shuffleAnimal &&
        (end === 1 ? (
          <WinAnimalCard animal={shuffleAnimal[choice]} />
        ) : (
          <>
            <AnimalCard
              animal={shuffleAnimal[choice]}
              choice={choice}
              onClickChoice={onClickChoice}
            />
            <div className="text-2xl mx-8 font-bold flex flex-col items-center justify-center">
              <div>{`${end === 2 ? "결승" : end + "강"}`}</div>
              <div>VS</div>
            </div>
            <AnimalCard
              animal={shuffleAnimal[choice + 1]}
              choice={choice + 1}
              onClickChoice={onClickChoice}
            />
          </>
        ))}
    </div>
  );
};

export default Worldcup;
