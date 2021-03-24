
> 已缓存函数 = useCallback(待缓存函数，依赖项)

useCallback的功能就是useMemo记忆函数一个封装，相比useMemo只是少套了一层函数：

> 已缓存函数 = useMemo( () => 待缓存函数, 依赖项)

