export interface ItemProps {
    title: string;
    description: string;
    type: 
        'credit' | 
        'analystic' | 
        'support' | 
        'training' | 
        'ticket' | 
        'submission' | 
        'streak' | 
        'champion' | 
        'variety' | 
        'master' | 
        'accuracy';
}