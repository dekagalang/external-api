"use client";

import DropdownCity from "@/components/dropdownCity";
import DropdownProvince from "@/components/dropdownProvince";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originState, setOriginState] = useState<number>(-1);

  const getCost = useCallback(async () => {
    if (originState === -1) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://8000-idx-test-1733641691232.cluster-qpa6grkipzc64wfjrbr3hsdma2.cloudworkstations.dev/cost",
        {
          method: "POST",
          body: JSON.stringify({
            origin: originState,
            destination: 444,
            weight: 1000,
            courier: "jne",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setData(result.rajaongkir.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [originState]);

  useEffect(() => {
    if (originState !== -1) {
      getCost();
    }
  }, [originState, getCost]);
  return (
    <div>
      <DropdownProvince
        url="https://8000-idx-test-1733641691232.cluster-qpa6grkipzc64wfjrbr3hsdma2.cloudworkstations.dev/province"
        label="Provinsi"
      />
      <DropdownCity
        url="https://8000-idx-test-1733641691232.cluster-qpa6grkipzc64wfjrbr3hsdma2.cloudworkstations.dev/city"
        label="Kota"
        onSelect={(city) => {
          setOriginState(city.city_id);
        }}
      />
      {!isLoading && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
