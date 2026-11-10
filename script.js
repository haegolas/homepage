// --- Slider Logic ---
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const video = document.getElementById('slider-video');
const totalSlides = slides.length;
let slideInterval;

function updateSlider() {
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.remove('bg-white/50');
            indicator.classList.add('bg-white');
        } else {
            indicator.classList.remove('bg-white');
            indicator.classList.add('bg-white/50');
        }
    });

    // Video handling
    if (currentSlide === 3) {
        // If it's the video slide, play the video and stop auto-sliding
        video.play().catch(e => console.log("Video auto-play prevented by browser."));
        clearInterval(slideInterval); 
    } else {
        // Pause video and restart auto-sliding if not on video slide
        video.pause();
        startAutoSlide();
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Initialize slider
startAutoSlide();

// --- Code Copy Logic ---
function copyCode() {
    const codeContent = `public interface IState
{
    void Enter();
    void Execute();
    void Exit();
}

public class PlayerStateMachine : MonoBehaviour
{
    private IState currentState;

    public void ChangeState(IState newState)
    {
        if (currentState != null)
            currentState.Exit();

        currentState = newState;
        currentState.Enter();
    }

    private void Update()
    {
        if (currentState != null)
            currentState.Execute();
    }
}`;
    // Use fallback copy method for iframe compatibility
    const textarea = document.createElement('textarea');
    textarea.value = codeContent;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        const copyText = document.getElementById('copy-text');
        copyText.innerText = 'Copied!';
        setTimeout(() => {
            copyText.innerText = 'Copy';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textarea);
}
