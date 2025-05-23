import { useState } from "react";
import { SketchPicker } from "react-color";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface ColorPickerFieldProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPickerField({ value, onChange }: ColorPickerFieldProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          style={{ backgroundColor: value || "#000" }}
          aria-label="Selecionar cor"
          variant="outline"
          className="w-12 h-12 p-0 rounded-sm"
        />
      </PopoverTrigger>
      <PopoverContent className="p-0 m-0 w-auto h-auto overflow-visible bg-transparent shadow-none border-none">
        <SketchPicker
          color={value || "#000"}
          onChange={(color) => onChange(color.hex)}
        />
      </PopoverContent>
    </Popover>
  );
}
