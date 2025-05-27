import { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
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
  const [color, setColor] = useColor(value);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          style={{ backgroundColor: value }}
          aria-label="Selecionar cor"
          variant="outline"
          className="w-12 h-12 p-0 rounded-sm"
        />
      </PopoverTrigger>
      <PopoverContent className="shadow rounded z-50">
        <ColorPicker
          color={color}
          onChange={(newColor) => {
            setColor(newColor);
            onChange(newColor.hex);
          }}
          hideAlpha
          hideInput
        />
      </PopoverContent>
    </Popover>
  );
}
