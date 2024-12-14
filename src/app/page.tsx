import DropdownCity from "@/components/dropdownCity";
import DropdownProvince from "@/components/dropdownProvince";

export default function Home() {
  return (
    <div>
      <DropdownProvince
        // url="https://jsonplaceholder.typicode.com/users"
        url="https://8000-idx-test-1733641691232.cluster-qpa6grkipzc64wfjrbr3hsdma2.cloudworkstations.dev/province"
        label="Provinsi"
      />
      <DropdownCity
        // url="https://jsonplaceholder.typicode.com/posts"
        url="https://8000-idx-test-1733641691232.cluster-qpa6grkipzc64wfjrbr3hsdma2.cloudworkstations.dev/city"
        label="Kota"
      />
      {/* <Dropdown
        url="https://jsonplaceholder.typicode.com/comments"
        label="Biaya"
      /> */}
    </div>
  );
}
