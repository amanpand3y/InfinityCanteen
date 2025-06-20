import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {collegeMap} from "../data/CollegeMap";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  const navigate = useNavigate();
  const searchValue = form.watch("searchQuery");

  const matchingColleges = useMemo(() => {
    if (!searchValue) return [];
    const lowercaseSearch = searchValue.toLowerCase();
    return Object.entries(collegeMap)
      .filter(([city]) => city.includes(lowercaseSearch))
      .slice(0, 5);
  }, [searchValue]);

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });
    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
    <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
        form.formState.errors.searchQuery && "border-red-500"
        }`}
    >
        <Search
        strokeWidth={2.5}
        size={30}
        className="ml-1 text-orange-500 hidden md:block"
        />

        <FormField
        control={form.control}
        name="searchQuery"
        render={({ field }) => (
            <FormItem className="flex-1 relative">
            <FormControl>
                <Input
                {...field}
                className="border-none shadow-none text-xl focus-visible:ring-0"
                placeholder={placeHolder}
                autoComplete="off"
                />
            </FormControl>

            {matchingColleges.length > 0 && (
                <Card className="absolute top-full mt-2 w-full z-10 shadow-lg">
                <ScrollArea className="max-h-60 rounded-md">
                    <CardContent className="p-0 divide-y divide-muted">
                    {matchingColleges.map(([city, college], i) => (
                        <div
                        key={i}
                        onClick={() => {
                            form.setValue("searchQuery", city);
                            navigate(`/search/${city}`);
                        }}
                        className="px-4 py-3 text-base cursor-pointer font-medium hover:bg-orange-100 transition-colors"
                        >
                        {college}
                        </div>
                    ))}
                    </CardContent>
                </ScrollArea>
                </Card>
            )}
            </FormItem>
        )}
        />

        {searchValue && (
        <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className="rounded-full"
        >
            Reset
        </Button>
        )}
        
        <Button type="submit" className="rounded-full bg-orange-500">
        Search
        </Button>
    </form>
    </Form>
  );
};

export default SearchBar;