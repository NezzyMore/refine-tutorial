import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
    notificationProvider,
    RefineSnackbarProvider,
    ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { MuiInferencer } from "@refinedev/inferencer/mui";

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <CssBaseline />
                    <GlobalStyles
                        styles={{ html: { WebkitFontSmoothing: "auto" } }}
                    />
                    <RefineSnackbarProvider>
                        <Refine
                            notificationProvider={notificationProvider}
                            routerProvider={routerBindings}
                            dataProvider={dataProvider(
                                "https://api.fake-rest.refine.dev"
                            )}
                            resources={[
                                {
                                    name: "blog_posts",
                                    list: "/blog-posts",
                                    show: "/blog-posts/show/:id",
                                    create: "/blog-posts/create",
                                    edit: "/blog-posts/edit/:id",
                                },
                            ]}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                            }}
                        >
                            <Routes>
                                <Route
                                    element={
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    }
                                >
                                    <Route
                                        index
                                        element={
                                            <NavigateToResource resource="blog_posts" />
                                        }
                                    />
                                    <Route path="blog-posts">
                                        <Route
                                            index
                                            element={<MuiInferencer />}
                                        />
                                        <Route
                                            path="show/:id"
                                            element={<MuiInferencer />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<MuiInferencer />}
                                        />
                                        <Route
                                            path="create"
                                            element={<MuiInferencer />}
                                        />
                                    </Route>
                                </Route>
                            </Routes>
                            <RefineKbar />
                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>
                    </RefineSnackbarProvider>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
