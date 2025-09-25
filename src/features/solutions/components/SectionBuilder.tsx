"use client";

import { useState } from "react";
import { Input } from "@/ui/components/input";
import { Button } from "@/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";
import type { Section } from "@/features/solutions/types";

type Props = {
  value: any[];
  onChange: (sections: any[]) => void;
};

const sectionTypes: Array<Section["type"]> = [
  "hero",
  "trusted-by",
  "testimonial",
  "grid",
  "product-feature",
  "component",
];

function createDefaultSection(type: Section["type"]): Section {
  const base: Section = {
    id: crypto.randomUUID?.() || Math.random().toString(36).slice(2),
    type,
    title: "",
    subtitle: "",
    description: "",
    backgroundColor: "white",
  } as any;

  switch (type) {
    case "trusted-by":
      return { ...base, logos: [] } as any;
    case "testimonial":
      return {
        ...base,
        quote: "",
        author: { name: "", title: "", avatar: { src: "" } },
      } as any;
    case "grid":
      return { ...base, gridCols: "3", cardSize: "medium", items: [] } as any;
    case "product-feature":
      return { ...base, image: "", imagePosition: "right", items: [] } as any;
    case "component":
      return { ...base, component: "ExporeDevxToday" } as any;
    case "hero":
    default:
      return base;
  }
}

export default function SectionBuilder({ value, onChange }: Props) {
  const [newType, setNewType] = useState<Section["type"]>("hero");
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const add = () => {
    const s = createDefaultSection(newType);
    onChange([...(value || []), s]);
  };

  const update = (index: number, partial: any) => {
    const next = [...value];
    next[index] = { ...next[index], ...partial };
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateNested = (index: number, path: string, val: any) => {
    const next = [...value];
    const target = { ...next[index] } as any;
    const keys = path.split(".");
    let cursor: any = target;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      cursor[k] = cursor[k] ?? {};
      cursor = cursor[k];
    }
    cursor[keys[keys.length - 1]] = val;
    next[index] = target;
    onChange(next);
  };

  const addItem = (index: number) => {
    const next = [...value];
    const items = Array.isArray((next[index] as any).items)
      ? ([...(next[index] as any).items] as any[])
      : [];
    items.push({ title: "", description: "" });
    (next[index] as any).items = items;
    onChange(next);
  };

  const updateItem = (index: number, itemIndex: number, partial: any) => {
    const next = [...value];
    const items = [...(next[index] as any).items];
    items[itemIndex] = { ...items[itemIndex], ...partial };
    (next[index] as any).items = items;
    onChange(next);
  };

  const removeItem = (index: number, itemIndex: number) => {
    const next = [...value];
    const items = [...(next[index] as any).items];
    items.splice(itemIndex, 1);
    (next[index] as any).items = items;
    onChange(next);
  };

  const getKeyForSection = (s: any, index: number) => String(s?.id || index);
  const toggleOpen = (s: any, index: number) => {
    const k = getKeyForSection(s, index);
    setOpenMap((m) => ({ ...m, [k]: !m[k] }));
  };
  const isOpen = (s: any, index: number) => {
    const k = getKeyForSection(s, index);
    return openMap[k] ?? true;
  };

  const move = (arr: any[], from: number, to: number) => {
    const next = [...arr];
    const a = next[from];
    next.splice(from, 1);
    next.splice(to, 0, a);
    return next;
  };

  const moveSectionUp = (i: number) => {
    if (i <= 0) return;
    onChange(move(value, i, i - 1));
  };

  const moveSectionDown = (i: number) => {
    if (i >= value.length - 1) return;
    onChange(move(value, i, i + 1));
  };

  const moveItemUp = (sectionIndex: number, i: number) => {
    const items = (value[sectionIndex] as any).items || [];
    if (i <= 0) return;
    const nextItems = move(items, i, i - 1);
    update(sectionIndex, { items: nextItems });
  };

  const moveItemDown = (sectionIndex: number, i: number) => {
    const items = (value[sectionIndex] as any).items || [];
    if (i >= items.length - 1) return;
    const nextItems = move(items, i, i + 1);
    update(sectionIndex, { items: nextItems });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Select value={newType} onValueChange={(v) => setNewType(v as any)}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select section type" />
          </SelectTrigger>
          <SelectContent>
            {sectionTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="button" onClick={add} className="bg-blue-500 text-white">
          Add Section
        </Button>
      </div>

      <div className="space-y-4">
        {value?.map((s: any, index: number) => (
          <div
            key={s.id || index}
            className="rounded-lg truncate border border-gray-400 bg-white"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-400 bg-white">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md border border-gray-300 bg-blue-500 px-2 py-0.5 text-xs font-medium text-white">
                  {s.type}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="text-xs text-gray-600"
                  type="button"
                  onClick={() => moveSectionUp(index)}
                >
                  Up
                </button>
                <button
                  className="text-xs text-gray-600"
                  type="button"
                  onClick={() => moveSectionDown(index)}
                >
                  Down
                </button>
                <button
                  className="text-xs text-gray-600"
                  type="button"
                  onClick={() => toggleOpen(s, index)}
                >
                  {isOpen(s, index) ? "Collapse" : "Expand"}
                </button>
                <button
                  className="text-xs text-red-600"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
            </div>

            {isOpen(s, index) && (
              <div className="p-4 grid gap-3 md:grid-cols-2">
                <div className="md:col-span-2 text-[11px] uppercase tracking-wide text-gray-500">
                  Basics
                </div>

                {(s.type === "grid" ||
                  s.type === "product-feature" ||
                  s.type === "trusted-by") && (
                  <div className="space-y-1">
                    <label className="text-xs text-gray-600">Title</label>
                    <Input
                      value={s.title || ""}
                      onChange={(e) => update(index, { title: e.target.value })}
                    />
                  </div>
                )}

                {(s.type === "grid" || s.type === "product-feature") && (
                  <div className="space-y-1">
                    <label className="text-xs text-gray-600">Subtitle</label>
                    <Input
                      value={s.subtitle || ""}
                      onChange={(e) =>
                        update(index, { subtitle: e.target.value })
                      }
                    />
                  </div>
                )}

                {(s.type === "grid" || s.type === "product-feature") && (
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-gray-600">Description</label>
                    <Input
                      value={s.description || ""}
                      onChange={(e) =>
                        update(index, { description: e.target.value })
                      }
                    />
                  </div>
                )}

                {(s.type === "testimonial" ||
                  s.type === "grid" ||
                  s.type === "product-feature") && (
                  <div className="space-y-1">
                    <label className="text-xs text-gray-600">Background</label>
                    <Select
                      value={s.backgroundColor || "white"}
                      onValueChange={(v) =>
                        update(index, { backgroundColor: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="white">white</SelectItem>
                        <SelectItem value="gray">gray</SelectItem>
                        <SelectItem value="slate">slate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {s.type === "grid" && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">
                        Grid Columns
                      </label>
                      <Select
                        value={s.gridCols || "3"}
                        onValueChange={(v) => update(index, { gridCols: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">Card Size</label>
                      <Select
                        value={s.cardSize || "medium"}
                        onValueChange={(v) => update(index, { cardSize: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">small</SelectItem>
                          <SelectItem value="medium">medium</SelectItem>
                          <SelectItem value="large">large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {s.type === "testimonial" && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">Quote</label>
                      <Input
                        value={s.quote || ""}
                        onChange={(e) =>
                          update(index, { quote: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">
                        Author Name
                      </label>
                      <Input
                        value={s.author?.name || ""}
                        onChange={(e) =>
                          updateNested(index, "author.name", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">
                        Author Title
                      </label>
                      <Input
                        value={s.author?.title || ""}
                        onChange={(e) =>
                          updateNested(index, "author.title", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">
                        Author Avatar URL
                      </label>
                      <Input
                        value={s.author?.avatar?.src || ""}
                        onChange={(e) =>
                          updateNested(
                            index,
                            "author.avatar.src",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </>
                )}

                {s.type === "trusted-by" && (
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-gray-600">Logos</div>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-7 px-2"
                        onClick={() => {
                          const next = [...value];
                          const logos = Array.isArray(next[index].logos)
                            ? [...(next[index] as any).logos]
                            : [];
                          logos.push({
                            src: "",
                            alt: "",
                            className: "h-8 w-auto",
                          });
                          (next[index] as any).logos = logos;
                          onChange(next);
                        }}
                      >
                        Add Logo
                      </Button>
                    </div>
                    {(s.logos || []).map((logo: any, i: number) => (
                      <div key={i} className="grid gap-2 md:grid-cols-3 mb-2">
                        <Input
                          placeholder="src"
                          value={logo.src || ""}
                          onChange={(e) => {
                            const next = [...value];
                            (next[index] as any).logos[i] = {
                              ...logo,
                              src: e.target.value,
                            };
                            onChange(next);
                          }}
                        />
                        <Input
                          placeholder="alt"
                          value={logo.alt || ""}
                          onChange={(e) => {
                            const next = [...value];
                            (next[index] as any).logos[i] = {
                              ...logo,
                              alt: e.target.value,
                            };
                            onChange(next);
                          }}
                        />
                        <Input
                          placeholder="className"
                          value={logo.className || ""}
                          onChange={(e) => {
                            const next = [...value];
                            (next[index] as any).logos[i] = {
                              ...logo,
                              className: e.target.value,
                            };
                            onChange(next);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {(s.type === "grid" || s.type === "product-feature") && (
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-gray-600">Items</div>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-7 px-2"
                        onClick={() => addItem(index)}
                      >
                        Add Item
                      </Button>
                    </div>
                    {(s.items || []).map((it: any, i: number) => (
                      <div key={i} className="grid gap-2 md:grid-cols-4 mb-2">
                        <Input
                          placeholder="title"
                          value={it.title || ""}
                          onChange={(e) =>
                            updateItem(index, i, { title: e.target.value })
                          }
                        />
                        <Input
                          placeholder="description"
                          value={it.description || ""}
                          onChange={(e) =>
                            updateItem(index, i, {
                              description: e.target.value,
                            })
                          }
                        />
                        {s.type === "grid" && (
                          <Select
                            value={String(
                              typeof it.icon === "string"
                                ? "url"
                                : it.icon
                                  ? "true"
                                  : "false"
                            )}
                            onValueChange={(v) => {
                              if (v === "url") {
                                updateItem(index, i, { icon: "" });
                              } else {
                                updateItem(index, i, { icon: v === "true" });
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="icon" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">icon: true</SelectItem>
                              <SelectItem value="false">icon: false</SelectItem>
                              <SelectItem value="url">icon: URL</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                        {s.type === "grid" && typeof it.icon === "string" && (
                          <Input
                            placeholder="icon url"
                            value={it.icon || ""}
                            onChange={(e) =>
                              updateItem(index, i, { icon: e.target.value })
                            }
                          />
                        )}
                        <Input
                          placeholder="button text"
                          value={it.button?.text || ""}
                          onChange={(e) =>
                            updateItem(index, i, {
                              button: {
                                ...(it.button || {}),
                                text: e.target.value,
                              },
                            })
                          }
                        />
                        <Input
                          placeholder="button link"
                          value={it.button?.link || ""}
                          onChange={(e) =>
                            updateItem(index, i, {
                              button: {
                                ...(it.button || {}),
                                link: e.target.value,
                              },
                            })
                          }
                        />
                        <div className="md:col-span-4 -mt-1">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              className="text-xs text-gray-600"
                              onClick={() => moveItemUp(index, i)}
                            >
                              Up
                            </button>
                            <button
                              type="button"
                              className="text-xs text-gray-600"
                              onClick={() => moveItemDown(index, i)}
                            >
                              Down
                            </button>
                            <button
                              type="button"
                              className="text-xs text-red-600"
                              onClick={() => removeItem(index, i)}
                            >
                              Remove Item
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {s.type === "product-feature" && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">Image URL</label>
                      <Input
                        value={s.image || ""}
                        onChange={(e) =>
                          update(index, { image: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">
                        Image Position
                      </label>
                      <Select
                        value={s.imagePosition || "right"}
                        onValueChange={(v) =>
                          update(index, { imagePosition: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">left</SelectItem>
                          <SelectItem value="right">right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* points for product-feature items */}
                    <div className="md:col-span-2">
                      {(s.items || []).map((it: any, i: number) => (
                        <div key={`points-${i}`} className="mt-2">
                          <div className="text-xs text-gray-600 mb-1">
                            Points for: {it.title || `Item ${i + 1}`}
                          </div>
                          {(it.points || []).map((pt: string, pi: number) => (
                            <div
                              key={pi}
                              className="flex items-center gap-2 mb-1"
                            >
                              <Input
                                placeholder={`Point #${pi + 1}`}
                                value={pt}
                                onChange={(e) => {
                                  const next = [...(s.items || [])];
                                  const points = Array.isArray(next[i].points)
                                    ? [...next[i].points]
                                    : [];
                                  points[pi] = e.target.value;
                                  next[i] = { ...next[i], points };
                                  update(index, { items: next });
                                }}
                              />
                              <button
                                type="button"
                                className="text-xs text-red-600"
                                onClick={() => {
                                  const next = [...(s.items || [])];
                                  const points = Array.isArray(next[i].points)
                                    ? [...next[i].points]
                                    : [];
                                  points.splice(pi, 1);
                                  next[i] = { ...next[i], points };
                                  update(index, { items: next });
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            className="h-7 px-2"
                            onClick={() => {
                              const next = [...(s.items || [])];
                              const points = Array.isArray(next[i].points)
                                ? [...next[i].points]
                                : [];
                              points.push("");
                              next[i] = { ...next[i], points };
                              update(index, { items: next });
                            }}
                          >
                            Add Point
                          </Button>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {s.type === "hero" && (
                  <div className="md:col-span-2">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-600">
                          Hero Title
                        </label>
                        <Input
                          value={s.props?.title || ""}
                          onChange={(e) =>
                            updateNested(index, "props.title", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <label className="text-xs text-gray-600">
                          Hero Description
                        </label>
                        <Input
                          value={s.props?.description || ""}
                          onChange={(e) =>
                            updateNested(
                              index,
                              "props.description",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs text-gray-600">
                          Hero Buttons
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-7 px-2"
                          onClick={() => {
                            const buttons = Array.isArray(s.props?.buttons)
                              ? [...s.props.buttons]
                              : [];
                            buttons.push({
                              text: "",
                              variant: "default",
                              size: "lg",
                            });
                            updateNested(index, "props.buttons", buttons);
                          }}
                        >
                          Add Button
                        </Button>
                      </div>
                      {(s.props?.buttons || []).map((bt: any, bi: number) => (
                        <div
                          key={bi}
                          className="grid gap-2 md:grid-cols-4 mb-2"
                        >
                          <Input
                            placeholder="text"
                            value={bt.text || ""}
                            onChange={(e) => {
                              const buttons = [...(s.props?.buttons || [])];
                              buttons[bi] = {
                                ...buttons[bi],
                                text: e.target.value,
                              };
                              updateNested(index, "props.buttons", buttons);
                            }}
                          />
                          <Input
                            placeholder="variant"
                            value={bt.variant || ""}
                            onChange={(e) => {
                              const buttons = [...(s.props?.buttons || [])];
                              buttons[bi] = {
                                ...buttons[bi],
                                variant: e.target.value,
                              };
                              updateNested(index, "props.buttons", buttons);
                            }}
                          />
                          <Input
                            placeholder="size"
                            value={bt.size || ""}
                            onChange={(e) => {
                              const buttons = [...(s.props?.buttons || [])];
                              buttons[bi] = {
                                ...buttons[bi],
                                size: e.target.value,
                              };
                              updateNested(index, "props.buttons", buttons);
                            }}
                          />
                          <Input
                            placeholder="className"
                            value={bt.className || ""}
                            onChange={(e) => {
                              const buttons = [...(s.props?.buttons || [])];
                              buttons[bi] = {
                                ...buttons[bi],
                                className: e.target.value,
                              };
                              updateNested(index, "props.buttons", buttons);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {s.type === "component" && (
                  <div className="space-y-1">
                    <label className="text-xs text-gray-600">
                      Component Name
                    </label>
                    <Input
                      value={s.component || ""}
                      onChange={(e) =>
                        update(index, { component: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
