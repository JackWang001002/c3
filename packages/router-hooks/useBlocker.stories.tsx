// const [confirmed, onConfirm] = useSwitch(false);
// const nav = useNavigate();
// const [dest, setDest] = useState<string>();
// const [modal, on, off] = useExitModal(() => {
//   onConfirm();
// });

// useEffect(() => {
//   if (confirmed) {
//     dest && nav(dest);
//   }
// }, [confirmed, dest, nav]);

// useBlocker(tx => {
//   on();
//   setDest(tx.location.pathname);
//   if (confirmed) {
//     tx.retry();
//   }
// });
