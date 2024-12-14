"use client";

import { CitySchema, City } from "@/constants";
import { useState, useEffect } from "react";
import styled from "styled-components";

const DropdownWrapper = styled.div`
  position: relative;
  width: 300px;
  margin: 20px auto;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  text-align: left;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  margin: 5px 0;
  padding: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const DropdownListItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

interface DropdownProps {
  label: string;
  url: string;
  onSelect: (item: CitySchema) => void;
}

const DropdownCity = ({ url, label, onSelect }: DropdownProps) => {
  const [data, setData] = useState<CitySchema[]>([]);
  const [selectedItem, setSelectedItem] = useState<CitySchema | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && data.length === 0) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(url);
          const result: City = await response.json();
          setData(result.rajaongkir.results);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [isOpen, data, url]);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (item: CitySchema) => {
    onSelect(item);
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <DropdownWrapper>
      <div>
        <p>{label}</p>
      </div>
      <DropdownButton onClick={toggleDropdown}>
        {selectedItem
          ? `${selectedItem.type} ${selectedItem.city_name}`
          : "Pilih Opsi"}
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {isLoading ? (
            <DropdownListItem>Loading...</DropdownListItem>
          ) : (
            data.map((item) => (
              <DropdownListItem
                key={item.city_id}
                onClick={() => handleSelect(item)}
              >
                {item.type} {item.city_name}
              </DropdownListItem>
            ))
          )}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

export default DropdownCity;
