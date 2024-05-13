import { useState, useEffect } from "react";
import PostCard from "../components/post";
import ProfileCard from "../components/profile_card";
import { PostList, Profile } from "../services/entities";
import { PostService } from "../services/post.service";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Skeleton, TextField } from "@mui/material";
import { HttpPostService } from "../services/http_post.service";
import React from "react";

const postService: PostService = new HttpPostService;

export default function ProfilePage(props: { user: Profile }) {

    const [postList, setList] = useState<PostList>([]);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [dialogContent, setContent] = useState('');
    const [selected, setSelected] = useState(0);

    const profile = props.user;

    function handleClickOpen(id: number, content: string) {
        setContent(content);
        setSelected(id);
        setOpen(true);
    };

    const handleTextFieldChange = (event: { target: { value: any; }; }) => { 
        setContent(event.target.value); 
      }; 

    const handleClose = () => {
        setContent('');
        setSelected(0);
        setOpen(false);
    };

    async function handleUpdate(){
        await postService.updatePost(selected, dialogContent);
        setContent('');
        setSelected(0);
        setOpen(false);
        listPosts();
    }

    async function listPosts(){
        try {
            setLoading(true);
            await postService.getPostByUser(profile.user_id).then(d => {
                setList(d);
            });
            
        } catch(error){
            console.log(error);
        };
        setLoading(false);
    }

    async function deletePost(id: number){
        await postService.deletePost(id);
        listPosts();
    }

    useEffect(() => {
        listPosts();
    }, []);

    return (
        <>
        {loading ? (
            <>
                <Skeleton animation="wave" variant="rounded" width={300} height={300} sx={{ margin: 1 }} />
            </>
        ) : (
            <><div style={{ display: 'flex', flexDirection: 'row' }}>
                        <ProfileCard location="profile" user={profile} />
                        <div id="posts">
                            {postList.map((value) => {
                                if (value.user_id == profile.user_id) {
                                    return <PostCard post={value} poster={true} deletePost={deletePost} handleDialog={handleClickOpen} />;
                                } else {
                                    return <PostCard post={value} poster={false} deletePost={deletePost} handleDialog={handleClickOpen} />;
                                }
                            })}
                        </div>
                    </div><Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries((formData as any).entries());
                                const email = formJson.email;
                                console.log(email);
                                handleClose();
                            },
                        }}
                        sx={{
                            "& .MuiDialog-container": {
                              "& .MuiPaper-root": {
                                width: "100%",
                                minWidth: "500px",  // Set your width here
                              },
                            },
                          }}
                    >
                            <DialogTitle>Edit Your Post</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="name"
                                    name="content"
                                    label="Update Content"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={dialogContent}
                                    onChange={handleTextFieldChange} />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleUpdate}>Update</Button>
                            </DialogActions>
                        </Dialog></>
        )
        }
        </>
    );
}