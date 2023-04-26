import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Typography
} from '@mui/material';

export function MessageCard({ alignSelf, sender, message, ...props }) {
    return (
        <Card
            {...props}
            sx={{
                alignSelf,
                m: 1,
                maxWidth: '80%'
            }}
        >
            <CardHeader
                titleTypographyProps={{ variant: 'body2' }}
                title={sender.username}
                subheader={message.sent_at}
                avatar={
                    <Avatar
                        variant='rounded'
                        src={sender.photoURL}
                    />
                }
            />
            <CardContent>
                <Typography variant='body1'>{message.message}</Typography>
            </CardContent>
        </Card>
    );
}
