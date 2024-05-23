import {useEffect, useState} from "react";
import {Autocomplete, CircularProgress, Grid, TextField} from "@mui/material";
import {useSearchCities} from "./useSearchCities";
import {City, CityLocation} from "../../types/City";
import ErrorInfo from "../../components/ErrorInfo";

/**
 * CitySearch component to search cities using search term
 *
 * @param param0 {onLocationChange: (selectedLocation: City) => void} - Callback with selected city details
 * @returns
 */
export default function CitySearch({
  onLocationChange
}: Readonly<{
  onLocationChange: (selectedLocation: City) => void;
}>) {
  const [open, setOpen] = useState<boolean>(false);
  const [citySearchTerm, setCitySearchTerm] = useState<string>("LON");
  const [options, setOptions] = useState<readonly CityLocation[]>([]);
  const [errorResponse, setErrorResponse] = useState("");

  //Get cities using the city search term
  const {data, isLoading, isError, error} = useSearchCities(citySearchTerm);

  /**
   * Effect to update the options on dropdown
   */
  useEffect(() => {
    let active = true;
    if (isLoading) {
      return undefined;
    }

    if (active && !isLoading && data) {
      setOptions([...data]);
    }

    return () => {
      active = false;
    };
  }, [data, isLoading]);

  useEffect(() => {
    if (isError && error?.message) {
      let message = error.message;
      if (error?.response?.error) {
        message += ` [${error?.response?.error?.code} : ${error?.response?.error?.message}]`;
      }
      setErrorResponse(message);
    }
  }, [isError, error]);

  /**
   * Effect to remove the options when dropdown closes
   */
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Grid container>
      {isError && (
        <Grid item xs={12}>
          <ErrorInfo errorMessage={errorResponse} />
        </Grid>
      )}
      <Grid item xs={12}>
        <Autocomplete
          data-testid={"input-city-search"}
          sx={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            fontFamily: "Roboto Condensed"
          }}
          open={open}
          clearOnEscape
          autoComplete
          includeInputInList
          filterSelectedOptions
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(city, value) => city.name === value.name}
          getOptionLabel={(city) => `${city.name}, ${city.country}`}
          options={options}
          loading={isLoading}
          onChange={(event: any, newValue: CityLocation | null) => {
            onLocationChange({
              name: newValue?.name ?? "",
              region: newValue?.region ?? "",
              desc: `${newValue?.region ?? ""}, ${newValue?.country ?? ""}`
            });
          }}
          onInputChange={(event, newInputValue) => {
            if (newInputValue && newInputValue.trim().length > 2) {
              setCitySearchTerm(newInputValue);
            } else {
              setOptions([]);
            }
          }}
          renderOption={(props, option, index) => {
            const key = `listItem-${option.id}`;
            return (
              <li {...props} key={key}>
                {`${option.name}, ${option.region}, ${option.country}`}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              data-testid={"input-city-search"}
              label={"Search City"}
              InputProps={{
                ...params.InputProps,

                sx: {fontFamily: "Roboto Condensed"},
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
