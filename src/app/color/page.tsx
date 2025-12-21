"use client";
import ColorCard from "@/components/color/ColorCard";
import ColorDialog from "@/components/color/ColorDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useColorStore from "@/store/ColorStore";
import { useEffect, useMemo, useState } from "react";

export default function ColorPage() {
  const colors = useColorStore((state) => state.colors);
  const initColor = useColorStore((state) => state.initColor);
  const [searchColor, setSearchColor] = useState<string>("");
  const [debounceSearch, setDebounceSearch] = useState<string>("");

  useEffect(() => {
    initColor();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(searchColor);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchColor]);

  const filterColor = useMemo(() => {
    const dSearch = debounceSearch?.toLowerCase();
    if (!dSearch) return colors;
    return colors.filter((color) => {
      return (
        color.label.toLowerCase().includes(dSearch) ||
        color.hex.toLowerCase().includes(dSearch)
      );
    });
  }, [colors, debounceSearch]);

  return (
    <div className="flex mt-4 flex-col gap-4 h-full ">
      <h1 className="text-2xl">Configuration Colors</h1>
      <div className="w-full flex justify-end gap-10 mr-12">
        <Input
          placeholder="Search"
          className="max-w-150"
          onChange={(e) => setSearchColor(e.target.value)}
          value={searchColor}
        />
        <ColorDialog type="ADD">
          <Button className="bg-blue-500 hover:bg-blue-400">Add Color</Button>
        </ColorDialog>
        <ColorDialog type="DELETE">
          <Button className="bg-red-500 hover:bg-red-400">Delete All</Button>
        </ColorDialog>
      </div>
      <div className=" grid grid-cols-4 gap-4 p-4 ">
        {filterColor.length === 0 ? (
          <div
            className="flex h-150 items-center justify-center col-span-3 
          "
          >
            <h1 className="text-xl text-zinc-500 mb-50">No Colors</h1>
          </div>
        ) : (
          filterColor.map((color) => <ColorCard key={color.id} color={color} />)
        )}
      </div>
    </div>
  );
}
