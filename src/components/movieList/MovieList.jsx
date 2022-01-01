import React, { useEffect, useState } from "react";
import "./MovieList.css";

import instance from "../../axios";
import { useHistory } from "react-router";
import WidgetUser from "../widgetLeft/WidgetUser";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

const MovieList = () => {
  const history = useHistory();
  const [movies, setMovies] = useState([]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "movie",
      headerName: "Movie",
      width: 180,
      renderCell: (params) => {
        return (
          <WidgetUser
            imageUrl={params.row.imageUrl}
            username={params.row.title}
            right
          />
        );
      },
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 180,
    },
    {
      field: "year",
      headerName: "Year",
      width: 130,
    },
    {
      field: "isSeries",
      headerName: "Is Series",
      width: 170,
    },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="edit"
              onClick={() => handelNavigation(params.row)}
            >
              <EditIcon className="movieList__edit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handelDelete(params.row._id)}
            >
              <DeleteIcon className="movieList__delete" />
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    let canceled = false;
    const getMovies = async () => {
      const res = await instance.get("/movies/getMovies");
      if (canceled) return;
      setMovies(res.data);
    };
    getMovies();

    return () => {
      canceled = true;
    };
  }, []);

  const handleCreateMovie = () => {
    history.push("/createMovie");
  };

  const handelDelete = async (id) => {
    const res = await instance.delete(`/movies/delete/${id}`);
    setMovies(res.data);
  };

  const handelNavigation = (movie) => {
    history.push({ pathname: `movie/${movie._id}`, movie: movie });
  };

  return (
    <div className="movieList">
      <div className="movieList__btn">
        <Button variant="contained" onClick={() => handleCreateMovie()}>
          Create Movie
        </Button>
      </div>
      {movies.length > 0 && (
        <div className="movieList__table">
          <DataGrid
            rows={movies}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(r) => r._id}
          />
        </div>
      )}
    </div>
  );
};

export default MovieList;
