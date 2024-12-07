import { createContext, useContext, useEffect, useState } from "react";

const EmailContext = createContext();

export function useValue() {
    return useContext(EmailContext);
}

export default function EmailProvider({ children }) {

    const [isLoadingEmailList, setIsLoadingEmailList] = useState(true);
    const [isLoadingMailBody, setIsLoadingMailBody] = useState(true);
    const [allEmailList, setAllEmailList] = useState(null);
    const [emailList, setEmailList] = useState(null);
    const [isReadContent, setIsReadContent] = useState(false);
    const [selectedMail, setSelectedMail] = useState(null);
    const [selectedMailBody, setSelectedMailBody] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [filter, setFilter] = useState(null);
    const [read, setRead] = useState(new Set());
    const [readList, setReadList] = useState([]);
    const [unreadList, setUnreadList] = useState([]);
    const [fav, setFav] = useState(new Set());
    const [favList, setFavList] = useState([]);
    const [errorMailList, setErrorMailList] = useState(null);
    const [errorMailBody, setErrorMailBody] = useState(null);

    useEffect(() => {
        // localStorage.clear();

        const readRestore = localStorage.getItem('read');
        if (readRestore) {
            setRead(new Set(JSON.parse(readRestore)));
        }

        const favRestore = localStorage.getItem('fav');
        if (favRestore) {
            setFav(new Set(JSON.parse(favRestore)));
        }


        fetch('https://flipkart-email-mock.vercel.app/?page=1')
            .then(response => response.json())
            .then(data => {
                setIsLoadingEmailList(false);
                setEmailList(data);
                setErrorMailList(null);
            }
            )
            .catch(error => {
                setIsLoadingEmailList(false);
                setErrorMailList(error.message);
            });

        fetch('https://flipkart-email-mock.vercel.app/')
            .then(response => response.json())
            .then(data => {
                setAllEmailList(data.list);
            }
            )
            .catch(error => console.error(error));

    }, []);


    useEffect(() => {

        fetch('https://flipkart-email-mock.vercel.app/?page=' + currentPage)
            .then(response => response.json())
            .then(data => {
                setIsLoadingEmailList(false);
                setEmailList(data);
                setTotalPage(Math.ceil(data.total / 10));
                setErrorMailList(null);
            }
            )
            .catch(error => {
                setIsLoadingEmailList(false);
                setErrorMailList(error.message);
            });

    }, [currentPage]);

    useEffect(() => {

        setIsLoadingMailBody(true);

        fetch('https://flipkart-email-mock.vercel.app/?id=' + selectedMail?.id)
            .then(response => response.json())
            .then(data => {
                setSelectedMailBody(data);
                setIsLoadingMailBody(false);
                setRead(previousState => {
                    localStorage.setItem('read', JSON.stringify([...previousState, data?.id]));
                    return new Set([...previousState, data?.id])
                });
                setErrorMailBody(null);
            }
            )
            .catch(error => {
                setIsLoadingMailBody(false);
                setErrorMailBody(error.message);
            });


    }, [selectedMail]);

    const updateList = () => {

        let unreadNew = [];
        let readNew = [];
        let favNew = [];

        if (allEmailList?.length > 0) {

            allEmailList.forEach(email => {
                if (read.has(email.id)) {
                    readNew.push(email);
                } else {
                    unreadNew.push(email);
                }

                if (fav.has(email.id)) {
                    favNew.push(email);
                }
            });

            setUnreadList(unreadNew);
            setReadList(readNew);
            setFavList(favNew);
        }
    }

    const readContent = () => {
        setIsReadContent(true);
    }

    const updateSelectedMail = (mail) => {
        setSelectedMail(mail);
        readContent();
    }

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const goToNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }

    }

    const toggleUnread = () => {
        if (filter === null) {
            setFilter("UNREAD");
        } else if (filter === "UNREAD") {
            setFilter(null);
        } else {
            setFilter("UNREAD");
        }
        setIsReadContent(false);
        setSelectedMail(null);
        updateList();
    }

    const toggleRead = () => {
        if (filter === null) {
            setFilter("READ");
        } else if (filter === "READ") {
            setFilter(null);
        } else {
            setFilter("READ");
        }
        setIsReadContent(false);
        setSelectedMail(null);
        updateList();
    }

    const toggleFavorite = () => {
        if (filter === null) {
            setFilter("FAV");
        } else if (filter === "FAV") {
            setFilter(null);
        } else {
            setFilter("FAV");
        }
        setIsReadContent(false);
        setSelectedMail(null);
        updateList();
    }

    const addToFav = () => {

         if (selectedMail) {

            if (fav.has(selectedMail.id)) {
                const newFav = fav;
                newFav.delete(selectedMail.id);
                localStorage.setItem('fav', JSON.stringify([...newFav]));
                setFav(new Set([...newFav]));
                return;
            }

            setFav(previousState => {
                localStorage.setItem('fav', JSON.stringify([...previousState, selectedMail.id]));
                return new Set([...previousState, selectedMail.id])
            });
        }

        
    }

    const emailValue = {
        isLoadingEmailList,
        emailList,
        isReadContent,
        selectedMail,
        isLoadingMailBody,
        selectedMailBody,
        currentPage,
        totalPage,
        filter,
        read,
        readList,
        unreadList,
        fav,
        favList,
        errorMailList,
        errorMailBody,
        readContent,
        updateSelectedMail,
        goToPrevPage,
        goToNextPage,
        toggleUnread,
        toggleRead,
        toggleFavorite,
        addToFav
    }


    return (
        <EmailContext.Provider value={emailValue}>
            {children}
        </EmailContext.Provider>
    )

}