import { CircularProgress, Paper } from '@mui/material';

interface ICardContainer {
    title?: string;
    loading?: boolean;
    children: React.ReactNode;
}

const CardContainer = ({title, loading = false, children}: ICardContainer) => {
  return (
    <Paper
        className="card"
        component="section"
        elevation={3}
        sx={{ p: '20px'}}
    >
        {title ? 
            <h2 className="card__title">
                {title}
            </h2>
        : null}
        <div className="card__body">
            {!loading ? 
                <>
                    {children}
                </>
            :
                <CircularProgress />
            }
        </div>
    </Paper>
  );
}

export { CardContainer }