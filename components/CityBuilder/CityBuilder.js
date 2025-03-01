import React, { useState } from "react";
import styled from "styled-components";

const structures = [
  { name: "🏠 House", cost: 100 },
  { name: "🏢 Office", cost: 300 },
  { name: "🌳 Park", cost: 150 },
  { name: "🏦 Bank", cost: 500 },
  { name: "🛒 Store", cost: 250 },
];

const CityBuilder = () => {
  const [coins, setCoins] = useState(1000); // Starting coins
  const [city, setCity] = useState([]); // List of built structures

  // Function to buy a structure
  const buyStructure = (structure) => {
    if (coins >= structure.cost) {
      setCoins(coins - structure.cost);
      setCity([...city, structure.name]);
    } else {
      alert("Not enough coins!");
    }
  };

  return (
    <Container>
      <Title>🏙️ City Builder</Title>
      <Coins>💰 Coins: {coins}</Coins>

      {/* Available Structures */}
      <Shop>
        <h3>🏗️ Build Your City</h3>
        <ShopGrid>
          {structures.map((structure, index) => (
            <StructureButton key={index} onClick={() => buyStructure(structure)}>
              {structure.name} - ${structure.cost}
            </StructureButton>
          ))}
        </ShopGrid>
      </Shop>

      {/* Built City Display */}
      <CityDisplay>
        <h3>🌆 Your City:</h3>
        {city.length > 0 ? (
          <CityGrid>
            {city.map((building, index) => (
              <CityItem key={index}>{building}</CityItem>
            ))}
          </CityGrid>
        ) : (
          <p>No buildings yet! Start constructing.</p>
        )}
      </CityDisplay>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const Coins = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: #48bb78;
`;

const Shop = styled.div`
  margin-top: 20px;
`;

const ShopGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const StructureButton = styled.button`
  padding: 10px;
  background:#5a67d8;
  color: white;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background:#434190;
  }
`;

const CityDisplay = styled.div`
  margin-top: 30px;
  padding: 15px;
  background: #f7fafc;
  border-radius: 10px;
`;

const CityGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const CityItem = styled.div`
  padding: 10px;
  font-size: 1.5rem;
  background: #edf2f7;
  border-radius: 8px;
`;

export default CityBuilder;
