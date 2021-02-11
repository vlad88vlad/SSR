import React from 'react';

export const DataContext = React.createContext({});

export const InternalContext = React.createContext({
    requests: [],
    resolved: false,
    current: 0,
});

export const createBrowserContext = (
    variableName = '_initialDataContext',
) => {
    const initial = window && window[variableName] ? window[variableName] : {};
    const internalContextValue = {
        current: 0,
        resolved: true,
        requests: [],
    };

    return ({ children = null }) => (
        <InternalContext.Provider value={internalContextValue}>
            <DataContext.Provider value={initial}>
                {children}
            </DataContext.Provider>
        </InternalContext.Provider>
    );
};

export const createServerContext = () => {
    const ctx = {};
    const internalContextValue = {
        current: 0,
        resolved: false,
        requests: [],
    };

    function ServerDataContext({ children = null }) {
        return (
            <InternalContext.Provider value={internalContextValue}>
                <DataContext.Provider value={ctx}>
                    {children}
                </DataContext.Provider>
            </InternalContext.Provider>
        );
    }

    const resolveData = async () => {
        // @ts-ignore
        const effects = internalContextValue.requests.map((item) => item.promise);

        await Promise.all(effects);

        internalContextValue.resolved = true;
        internalContextValue.current = 0;

        return {
            data: ctx,
            toJSON() {
                return this.data;
            },
            toHtml(variableName = '_initialDataContext') {
                return `<script>window.${variableName} = ${JSON.stringify(
                    this.data,
                )};</script>`;
            },
        };
    };

    return {
        ServerDataContext,
        resolveData,
    };
};
