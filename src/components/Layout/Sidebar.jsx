import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setSidebar(true);
      } else {
        setSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial width

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="fixed z-50 md:z-0 bg-white px-3 py-2 mt-4 top-20 left-4 2xl:top-0">
        <i
          className="fa fa-bars text-3xl"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></i>
      </div>
      <Card
        className={`sidebar h-[calc(100%)] w-full fixed left-0 z-30 min-w-[10rem] max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ${
          sidebar ? "sidebar-show" : "sidebar-hide"
        }`}
      >
        <div className="mb-2 p-3">
          <Typography
            variant="h5"
            color="blue-gray"
            onClick={toggleSidebar}
            className="flex"
          >
            <i className="fa fa-bars m-3 sm:text-3xl" aria-hidden="true"></i>
            <p className="m-3 text-3xl">Project...</p>
          </Typography>
        </div>
        <List>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0 mt-[calc(10%)]" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Dashboard
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to="/add_videos">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Add videos
                  </ListItem>
                </Link>
                <Link to="/watch-history">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Watch history
                  </ListItem>
                </Link>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Projects
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <Link to="/liked_videos">
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Liked videos
            </ListItem>
          </Link>
          <Link to="/user">
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem></Link>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
        </List>
      </Card>
    </>
  );
};

export default Sidebar;
